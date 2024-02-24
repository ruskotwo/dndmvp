export const handleAllData = (evt, setState) => {
    const data = evt;
    if (data && data.game && data.items && data.characters) {
        setState({
            game: data.game,
            items: data.items,
            characters: data.characters,
        });
    }
};
