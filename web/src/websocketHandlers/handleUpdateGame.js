export const handleUpdateGame = (data, state, setState) => {
    const updatedGame = data;
    if (!updatedGame || typeof updatedGame !== 'object' || !updatedGame.id || !updatedGame.key || !updatedGame.value) {
        console.error('Invalid data received for game update:', updatedGame);
        return;
    }

    // Обновляем соответствующую характеристику игры
    const newGame = { ...state.game };
    newGame[updatedGame.key] = updatedGame.value;

    // Обновляем состояние, чтобы отобразить изменения
    setState({
        game: newGame,
        items: state.items,
        characters: state.characters
    });
};
