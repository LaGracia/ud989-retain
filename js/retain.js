// Wait for document to finish loading before running the enclosed functions
// http://www.w3schools.com/jquery/jquery_syntax.asp
$(function(){

    // Check if local storage contains notes; convert notes to JSON strings
    // http://www.w3schools.com/html/html5_webstorage.asp
    // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
    var model = {
        init: function() {
            if (!localStorage.notes) {
                localStorage.notes = JSON.stringify([]);
            }
        },
        // Add user input as JSON to local storage; convert storage data to JSON
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
        add: function(obj) {
            var data = JSON.parse(localStorage.notes);
            data.push(obj);
            localStorage.notes = JSON.stringify(data);
        },

        // Fetch all JSON objects (i.e., notes) from local storage
        getAllNotes: function() {
            return JSON.parse(localStorage.notes);
        }
    };


    // Add new content and date to the model; update the view
    var octopus = {
        addNewNote: function(noteStr) {
            model.add({
                content: noteStr,
                date: Date.now()
            });
            view.render();
        },

        // Fetch all notes from the model in reverse order
        getNotes: function() {
            return model.getAllNotes().reverse();
        },

        // Load itself, thereby loading the model and the view
        init: function() {
            model.init();
            view.init();
        }
    };


    // Accept content in the input box and update the view
    var view = {
        init: function() {
            this.noteList = $('#notes');
            var newNoteForm = $('#new-note-form');
            var newNoteContent = $('#new-note-content');
            newNoteForm.submit(function(e){
                octopus.addNewNote(newNoteContent.val());
                newNoteContent.val('');
                e.preventDefault();
            });
            view.render();
        },
        
        // Update by creating a list with submitted notes and their dates
        render: function(){
            var htmlStr = '';
            octopus.getNotes().forEach(function(note){
                htmlStr += '<li class="note"><span class="note-date">' + new Date(note.date).toString() + note.content + '</span></li>';
            });
            this.noteList.html( htmlStr );
        }
    };

    // Load the octopus
    octopus.init();
});