import runCommand from './interactionCreate/runCommand';
import ready from './ready/ready';
import handleModalSubmit from './interactionCreate/handleModalSubmit';
import handleButtonInteraction from './interactionCreate/handleButtonInteraction';

const events = [ready, runCommand, handleModalSubmit, handleButtonInteraction];

export default events;
