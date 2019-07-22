setId(1); 

var $notes = [];

var newNoteText = $('#note');
var newNoteColor = $('#color');
var editNoteIndex = $('#edit');
var saveButton = $('#save');
var notesContainer = $('#notes');

var noteId = getId();

$('form').submit(function(e){ 
    e.preventDefault();

    if(newNoteText.val()=='') return;

    var noteText = newNoteText.val();
    var noteColor = newNoteColor.val();

    if(isEdit()){
        var noteIdToEdit = editNoteIndex.val();
        var newNote = new Note(noteIdToEdit, noteText, noteColor);
        updateNote(noteIdToEdit, newNote);
    }else{
        var newNote = new Note(noteId, noteText, noteColor);
        addNewNote(newNote);
        setId(noteId++);
    }
    
    displayNotes();
    
    $('form')[0].reset();
});

function Note(id, text, color) {
    this.id = id;
    this.text = text;
    this.color = color; 
}

function addNewNote(note){
    $notes.push(note);
}

function editNote(noteId){
    var foundNote = $notes.find(x => x.id == noteId);
    editNoteIndex.val(foundNote.id);
    newNoteText.val(foundNote.text);
    newNoteColor.val(foundNote.color);
    saveButton.text('Edit');
}

function updateNote(oldNoteId, newNote){
    var foundNote = $notes.findIndex(x => x.id == oldNoteId);
    $notes[foundNote] = newNote;
    displayNotes();
    editNoteIndex.val('false');
    saveButton.text('Save');
}

function deleteNote(noteId){
    var noteIndex = $notes.findIndex(x => x.id == noteId);
    $notes.splice(noteIndex, 1);
    displayNotes();
    $('form')[0].reset();
}

function displayNotes()
{
    notesContainer.html('');
    $notes.forEach(function(note, index, arr){
        notesContainer.append(newContainerWithNote(note));
    });
}

function isEdit(){
    if(editNoteIndex.val() === 'false'){
        return false;
    }
    return true;
}

function setId(id){
    localStorage.removeItem('id');
    localStorage.setItem('id', id);
}

function getId(){
    return localStorage.getItem('id');
}


function newContainerWithNote(note){
    var edit = "<div class='edits'><a onclick='editNote("+note.id+")'>(edit)</a><a onclick='deleteNote("+note.id+")'>(delete)</a></div>";
    var div = "<div class='note' style='background-color:"+note.color+"'><div class='text'>"+note.text+"</div>"+edit+"</div>";
    return div;
}