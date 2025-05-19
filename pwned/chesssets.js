
class ChessSets {
    static piece_sets = [
        { type: 'U', url: 'https://cdn.jsdelivr.net/gh/oakmac/chessboardjs/website/img/chesspieces/alpha/{piece}.png' },
        { type: 'U', url: 'https://lichess.org/assets/piece/maestro/{piece}.svg' },
        { type: 'U', url: 'https://cdn.jsdelivr.net/gh/oakmac/chessboardjs/website/img/chesspieces/wikipedia/{piece}.png' },
        { type: 'U', url: 'https://github.com/lichess-org/lila/blob/master/public/piece/alpha/{piece}.svg' },
        { type: 'U', url: 'https://cdn.jsdelivr.net/gh/oakmac/chessboardjs/website/img/chesspieces/uscf/{piece}.png' },
        { type: 'L', url: 'https://raw.githubusercontent.com/pychess/pychess/refs/heads/master/pieces/alfonso/{piece}.svg' },
        { type: 'L', url: 'https://raw.githubusercontent.com/pychess/pychess/refs/heads/master/pieces/california/{piece}.svg' },
        { type: 'L', url: 'https://raw.githubusercontent.com/pychess/pychess/refs/heads/master/pieces/chessnut/{piece}.svg' },
        { type: 'L', url: 'https://raw.githubusercontent.com/pychess/pychess/refs/heads/master/pieces/california/{piece}.svg' },
        { type: 'L', url: 'https://raw.githubusercontent.com/pychess/pychess/refs/heads/master/pieces/chessnut/{piece}.svg' },
        { type: 'U', url: 'https://cdn.jsdelivr.net/gh/jbkunst/chessboardjs-themes@master/chesspieces/metro/{piece}.png' }
    ];

    constructor() {

    }



    async LoadCache(index) {
        const piece_set = piece_sets[index];
        pieces_type = piece_set.type;
        pieces_url = piece_set.url;
        const cache = {};
        await Promise.all(
            PIECE_CODES.map(async pc => {
                const adjusted_piece = (pieces_type === 'L') ? pc.toLowerCase() : pc;
                const url  = pieces_url.replace('{piece}', adjusted_piece);
                const blob = await fetch(url).then(r => r.blob());
                cache[pc]  = await new Promise(res => {
                    const file_reader = new FileReader();
                    file_reader.onload = () => res(file_reader.result);
                    file_reader.readAsDataURL(blob);
                });
            })
        );
        return cache;
    }

    SetSet(index) {

    }
}