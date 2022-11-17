import { getStorage, ref } from 'firebase/storage';

const storage = getStorage();

// Create a child reference
const imagesRef = ref(storage, 'images');
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
const spaceRef = ref(storage, 'images/space.jpg');
// spaceRef now points to "images/space.jpg"
// imagesRef still points to "images"
