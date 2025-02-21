export default function notesApp() {
    return {
        count: 0,
        taskInput: null,
        displaytext: null,
        taskSection: false,

        increment() {
            this.count++;
            console.log(this.count);
        },

        addNote() {
            console.log('Note added: ' + this.taskInput);
            this.taskSection = true;
            this.displaytext = this.taskInput; // Display the note
        }
    };
}
