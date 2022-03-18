class NonogramMultiplayerGame {
	constructor(p1, p2,room) {
        this._players = [p1, p2];
        this._turn = null;
        this._nonogram = null;
        this._choice = null;
        this._roomId = room;

        this._players.forEach( (player, idx) => {
            player.on('turn', () => {
                  this._playerTurn();
            });

            player.on('empty grid', (value) => {                      
                 this._updateNonogram(value);
            });

            player.on('nonogram', (nonogram) => {
                this._nonogram = nonogram;
            });

            player.on('correct', ()=> {
                  this._checkProgress();
            });
        });

        this._playerTurn();
    }

    _sendToPlayers(msg) {
        this._players.forEach( (player) => {
            player.emit('multiplayer', msg);
        });
    }

    _playerTurn() {
        if(this._turn === this._players[0]) {
            //player 2 turn
            this._turn.emit('wait');
            this._turn = this._players[1];
            this._turn.emit('turn', 'Turn of player 2');
            this._turn.emit('your turn to play');
            console.log("Turn of player 2 player 1 must wait");
        }else{
            //player 1 turn
            this._players[1].emit('wait');
            this._turn = this._players[0];
            this._turn.emit('turn', 'Turn of player 1');
            this._turn.emit('your turn to play');
            console.log("Turn of player 1 player 2 must wait");
        }
    }

    _sendNonogramToPlayer() {
        if(this._turn === this._players[0]) {
            this._players[1].emit('nonogram', this._nonogram);
        }else{
            this._players[0].emit('nonogram', this._nonogram);
        }
    }

    _updateNonogram(data) {
        if(this._turn === this._players[0]) {
            this._players[1].emit('update', data);
        }else{
            this._players[0].emit('update', data);
        }
    }

    _checkProgress() {
        this._players.forEach( (player) => {
            player.emit('correct');
        });
    }
};

module.exports = NonogramMultiplayerGame;