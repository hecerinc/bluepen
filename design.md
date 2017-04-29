# Design 

## Components

- App: Main container for application
- Nav: Navigation container
- Feedback: Main view when viewing design (Controller View)
- Projects: View for list of projects
- Singles: View for list of Singles
- Project: A single project
- Single: A single single
- Thread: A thread of commments
- Comment: A single comment

## Data
- Project:
	- Title
	- Description
	- Author (User Creator) 
	- HasMany Admins
	- HasMany Singles
- Single:
	- Title
	- Description
	- Image
	- Created
	- Participants?
	- Version?
- User:
	- name
	- email
- Author: 
	- Color (per single, which may vary across singles) * randomly assigned
	- is a User or is a Guest
- Thread:
	- Position (x,y)
	- Author (thread starter) : User or Guest :
	- Comment Count? # no esto no, es derived
	- BelongsTo Single
- Comment: 
	- Body
	- Author
	- Created
	- Modified
	- BelongsTo Thread

# Requirements

- Cada foto creada tiene su propio URL 
- Cuando le picas a la foto puedes poner un comentario en ese lugar y aparece un indicador de que hay un comentario
- Cada usuario que comente tiene su propio color
- Hay un boton de Agree en cada comment y
- Cada vez que se le pica al boton de Agree se generan un indicador del # de agrees
- Cada comment indica quien es el autor con el nombre y un highlight del color
- Cada comment puede ser borrado
- Support Guest comments (con nombre)
- Shrink un chingo las fotos (por si subes algo monstruoso)
- Highlight the new notes (since last saw)
- Upload new version
	- Clone comments from previous version?
- Group by Project o Singles
	- Project has title and desc



## Phase 2:

- Usuarios y cada usuario tiene su coleccion de bluepens



De ellos:

- Crazy performance improvements! Everything loads like lightning.
- @mentioning! @type someone’s name and they’ll be emailed demanding their attention. A great but dangerous feature. (And coming shortly: Slack integration.)
- Review comments after getting feedback with the comments sidebar.
- Upload retina images and make them look nice.
- See all notifications in the Face in the top right.
- For projects that are too noisy, turn off all notifications except @mentions.
- Archive other people’s projects.
- Efficiently remove teammates who’ve left the company.
- Mass-versioning: version multiple files at once by dragging files that are named the same as old images into the project.
- Keyboard shortcuts! Arrow left & right to navigate between designs in a project. Esc to go up a level. Command-Enter to post a comment.
- Te dice quien esta viendo el design al mismo tiempo que tu
- Te pide a fuerza un mail para poder poner un commentario


## Annotation state diagram

Components for annotations:

- Shot
	- Annotation
		- CommentForm


### State

What does each component need to know to effectively show/hide annotations?

The annotation will decide whether to show itself to the right or to the left depending on the amount of space available on open

- Shot: 
	- `isSomethingOpen`: whether something (an annotation) is open (clickPermanent)
	- `isNewOpen`: whether there's a **new** annotation open
	- `pending`: a "pending" note is a new note that has text written to its textarea (need this to move it instead of creating new one)
	- `lastCreated`: which annotation did I last create
- Annotation:
	- `hovered`: am I hovered?
	- `isHoverPermanent`: whether I survive hover out
	- `isClickPermanent`: whether I survive click out
	- `isBlank`: do I have something written? 
	- `isFocused`: am I focused?
	
Something is hover permanent when: 
	- It's new
	- It's new AND focused

Something is click permanent when: 
	- It's new AND !blank (focused or not focused)
	- It's !new AND focused
	- It's !new AND !blank AND (focused or !focused)

