export const handleCreateCharacter = (data, state, setState) => {
    const newCharacter = data;
    if (!newCharacter || typeof newCharacter !== 'object' || !newCharacter.id) {
        console.error('Invalid data for creating character:', newCharacter);
        return;
    }

    if (state.characters.find(character => character.id === newCharacter.id)) {
        console.error('Character with ID already exists:', newCharacter.id);
        return;
    }

    setState(prevState => ({
        ...state,
        characters: [...prevState.characters, newCharacter]
    }));
};
