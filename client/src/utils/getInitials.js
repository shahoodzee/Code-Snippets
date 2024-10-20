export default function(name){
    // Split the name string by spaces
    const nameParts = name.trim().split(' ');

    // If there's only one part (first name), return the first letter of it
    if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
    }

    // Otherwise, return the first letter of the first and last name
    const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
    const lastNameInitial = nameParts[1].charAt(0).toUpperCase();

    return firstNameInitial + lastNameInitial;
}