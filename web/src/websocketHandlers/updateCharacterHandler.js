export const handleUpdateCharacter = (data, state, setState) => {
    const updatedStat = data;
    if (!updatedStat || typeof updatedStat !== 'object' || !updatedStat.id || !updatedStat.key || !updatedStat.value) {
        console.error('Invalid data received for character update:', updatedStat);
        return;
    }

    const updatedCharacters = state.characters.map(character => {
        if (character.id === updatedStat.id) {
            return {
                ...character,
                [updatedStat.key]: updatedStat.value
            };
        } else {
            return character;
        }
    });

    setState({
        ...state,
        characters: updatedCharacters
    });
};
