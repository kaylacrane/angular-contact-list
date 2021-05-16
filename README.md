# Contact List App

Contact list app that allows user to add new contacts, as well as modify and deletes already added contacts

## Form validation and error messages

Form fields are validated using FormControl and FormGroup:

- First and last name must be at least 3 characters
- Age must be between 0 and 125
- DNI or NIE is validated using regex and must be 9 characters long
- Birthday must be in DD/MM/YYYY format
- A valid selection must be made for Gender and Favorite Color

Error messages appear and inputs are marked in red when they don't have valid data

## Technologies used

- Angular
- Material
- SASS
