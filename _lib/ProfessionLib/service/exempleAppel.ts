import { getAllProfessions, addProfession, getProfessionById, updateProfession, deleteProfession } from './professionService';

// Get all professions
getAllProfessions()
    .then(professions => console.log(professions))
    .catch(error => console.error(error));

// Add a new profession
addProfession({
    name: 'Engineer',
    description: 'An expert in engineering',
    yearsOfExperience: 5,
})
    .then(newProfession => console.log(newProfession))
    .catch(error => console.error(error));

// Get a profession by ID
getProfessionById('professionId')
    .then(profession => console.log(profession))
    .catch(error => console.error(error));

// Update a profession
updateProfession('professionId', { yearsOfExperience: 6 })
    .then(updatedProfession => console.log(updatedProfession))
    .catch(error => console.error(error));

// Delete a profession
deleteProfession('professionId')
    .then(() => console.log('Profession deleted'))
    .catch(error => console.error(error));