export const handleUpdateItem = (data, state, setState) => {
    const updatedItem = data;
    if (!updatedItem || typeof updatedItem !== 'object' || !updatedItem.id || !updatedItem.key || !updatedItem.value) {
        console.error('Invalid data received for item update:', updatedItem);
        return;
    }

    // Преобразование строки в число для поля count и ownerId
    let processedValue = updatedItem.value;
    if (updatedItem.key === 'count' || updatedItem.key === 'ownerId') {
        processedValue = parseInt(updatedItem.value, 10);
    }

    // Обновление значения в зависимости от ключа
    const updatedItems = state.items.map(item => {
        if (item.id === updatedItem.id) {
            return {
                ...item,
                [updatedItem.key]: processedValue
            };
        } else {
            return item;
        }
    });

    setState({
        ...state,
        items: updatedItems
    });
};
