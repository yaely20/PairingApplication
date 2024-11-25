const pairParticipants = (data, maxAgeDifference) => {
    const sortedData = data.filter(person => !isNaN(person.age)).sort((a, b) => b.age - a.age);
    const pairs = [];
    const used = new Set();

    sortedData.forEach((person1, i) => {
        if (used.has(person1.name)) return;

        for (let j = i + 1; j < sortedData.length; j++) {
            const person2 = sortedData[j];
            if (used.has(person2.name)) continue;

            const ageDifference = Math.abs(person2.age - person1.age);
            if (person1.family !== person2.family && ageDifference <= maxAgeDifference) {
                pairs.push([person1, person2]);
                used.add(person1.name);
                used.add(person2.name);
                break;
            }
        }
    });

    const unpaired = sortedData.filter(person => !used.has(person.name));
    return { pairs, unpaired };
};

module.exports = { pairParticipants };
