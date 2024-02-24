export const handleDeleteCharacter = (data, state, setState) => {
    const characterId = data;
    if (!characterId) {
        console.error('Invalid character id:', characterId);
        return;
    }

    const updatedCharacters = state.characters.filter(character => character.id !== characterId);

    localStorage.removeItem(`playerNotes_${characterId}`);

    setState({
        ...state,
        characters: updatedCharacters
    });
};
