import axiosInstance from "./axiosInstance";

export default function notesApp() {
  return {
    notes: [],
    newNote: { title: "", content: "", category: "" },
    homeSection: true,
    searchBarSection:true,
    notesDisplaySection: true,
    addNoteSection: false,
    footSection: true,
    
    async displayNotes() {
        console.log("display notes");
        console.log("axiosInstance:", axiosInstance); // Check if axiosInstance is defined
    
        try {
            const response = await axiosInstance.get('/api/getNotes');
            console.log("Response data:", response.data);
            this.notes = response.data.data ?? [];
        } catch (error) {
            console.error("Error fetching notes:", error);
            alert("Failed to fetch notes. Please try again.");
        }
    },
    
    async goToAddPage(){
        console.log('and then')
        // this.homeSection = true
        this.addNoteSection = true
         this.searchBarSection = false
         this.notesDisplaySection = false
        this.footSection= false

    },

    goToHomePage() {
        this.notes=[]
        this.displayNotes()
        this.homeSection = true;
        this.addNoteSection = false;
        this.searchBarSection = true; 
        this.notesDisplaySection = true;
        this.footSection = true;
    },
    

    async addNote() {
        if (!this.newNote.title || !this.newNote.content) {
            alert("Title and Content are required!");
            return;
        }
        
        try {
            this.notes= []

            console.log("Adding note:", this.newNote.title);
    
            // Make the API call to add the note to the database
            const response = await axiosInstance.post('/api/addNote', this.newNote);
            
            console.log("API Response:", response); // Log the entire response
    
            if (response.status === 201) {
                // Create a new note object using data from newNote
                const newNoteToDisplay = {
                    id: Date.now(), // Generate a temporary ID
                    title: this.newNote.title, // Use the title from the input
                    content: this.newNote.content, // Use the content from the input
                    category: this.newNote.category // Use the category from the input
                };
    
                // Push the newly added note into the notes array to display immediately
                this.notes.push(newNoteToDisplay);
                
                // Clear input fields
                this.newNote = { title: '', content: '', category: '' };
                console.log("Note added successfully:", newNoteToDisplay);
    
                // Show the notes display section if needed
                this.notesDisplaySection = true;
            }
        } catch (error) {
            console.error("Error adding note:", error);
            alert("There was an error adding the note. Please try again.");
        }
    } 
    
  };
}
