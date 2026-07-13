// =============================
// network.js
// 網路多人遊戲系統（WebSocket）
// =============================

const NetworkManager = {
    // 連接狀態
    connected: false,
    socket: null,
    playerId: null,
    playerName: '',
    
    // 伺服器配置
    serverUrl: 'ws://localhost:8080',
    reconnectAttempts: 0,
    maxReconnectAttempts: 5,
    reconnectDelay: 3000,
    
    // 玩家狀態
    remotePlayers: {},
    
    // 初始化
    init(name, serverUrl = null) {
        this.playerName = name || 'Player_' + Math.random().toString(36).substr(2, 9);
        if (serverUrl) this.serverUrl = serverUrl;
        
        this.connect();
    },
    
    // 連接到伺服器
    connect() {
        try {
            this.socket = new WebSocket(this.serverUrl);
            
            this.socket.onopen = () => this.onConnected();
            this.socket.onmessage = (event) => this.onMessage(event.data);
            this.socket.onclose = () => this.onDisconnected();
            this.socket.onerror = (error) => this.onError(error);
        } catch (e) {
            console.warn('WebSocket 不可用，使用單人模式');
            this.connected = false;
        }
    },
    
    // 連接成功
    onConnected() {
        this.connected = true;
        this.reconnectAttempts = 0;
        console.log('✅ 已連接到伺服器');
        
        // 發送初始化信息
        this.send({
            type: 'JOIN',
            playerName: this.playerName
        });
    },
    
    // 收到消息
    onMessage(data) {
        try {
            const message = JSON.parse(data);
            
            switch (message.type) {
                case 'PLAYER_ID':
                    this.playerId = message.playerId;
                    console.log('玩家 ID:', this.playerId);
                    break;
                    
                case 'PLAYER_JOINED':
                    this.onPlayerJoined(message);
                    break;
                    
                case 'PLAYER_MOVED':
                    this.updateRemotePlayer(message);
                    break;
                    
                case 'GAME_STATE':
                    this.syncGameState(message);
                    break;
                    
                case 'GAME_OVER':
                    this.onRemoteGameOver(message);
                    break;
            }
        } catch (e) {
            console.error('消息解析錯誤:', e);
        }
    },
    
    // 玩家加入
    onPlayerJoined(message) {
        console.log('玩家加入:', message.playerName);
        this.remotePlayers[message.playerId] = {
            id: message.playerId,
            name: message.playerName,
            x: message.x || 1,
            y: message.y || 1,
            color: message.color || '#00FF00'
        };
    },
    
    // 更新遠端玩家位置
    updateRemotePlayer(message) {
        if (this.remotePlayers[message.playerId]) {
            this.remotePlayers[message.playerId].x = message.x;
            this.remotePlayers[message.playerId].y = message.y;
        }
    },
    
    // 斷開連接
    onDisconnected() {
        this.connected = false;
        console.warn('❌ 與伺服器斷開連接');
        
        // 嘗試重新連接
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`嘗試重新連接... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            setTimeout(() => this.connect(), this.reconnectDelay);
        }
    },
    
    // 錯誤處理
    onError(error) {
        console.error('WebSocket 錯誤:', error);
    },
    
    // 同步遊戲狀態
    syncGameState(message) {
        // 同步遠端遊戲狀態
        if (message.keysCollected !== undefined) {
            // 更新遠端鑰匙收集數
        }
    },
    
    // 遠端遊戲結束
    onRemoteGameOver(message) {
        console.log('遠端玩家遊戲結束:', message.playerName, message.result);
    },
    
    // 發送消息
    send(data) {
        if (this.connected && this.socket) {
            this.socket.send(JSON.stringify(data));
        }
    },
    
    // 發送玩家位置
    sendPlayerPosition(x, y) {
        this.send({
            type: 'PLAYER_MOVED',
            playerId: this.playerId,
            x: x,
            y: y
        });
    },
    
    // 發送遊戲結束
    sendGameOver(result) {
        this.send({
            type: 'GAME_OVER',
            playerId: this.playerId,
            result: result
        });
    },
    
    // 斷開連接
    disconnect() {
        if (this.socket) {
            this.socket.close();
        }
    }
};

// 定期同步玩家位置
setInterval(() => {
    if (NetworkManager.connected && gameRunning) {
        NetworkManager.sendPlayerPosition(player.x, player.y);
    }
}, 100);

// 繪製遠端玩家
function drawRemotePlayers(ctx) {
    for (const playerId in NetworkManager.remotePlayers) {
        const remotePlayer = NetworkManager.remotePlayers[playerId];
        const px = remotePlayer.x * TILE_SIZE + TILE_SIZE / 2;
        const py = remotePlayer.y * TILE_SIZE + TILE_SIZE / 2;
        
        // 繪製遠端玩家（不同顏色）
        ctx.fillStyle = remotePlayer.color;
        ctx.beginPath();
        ctx.arc(px, py, 12, 0, Math.PI * 2);
        ctx.fill();
        
        // 繪製名字
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(remotePlayer.name, px, py - 20);
    }
}