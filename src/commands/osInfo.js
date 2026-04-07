import os from 'os';

export async function handleOSCommand(flag) {
  switch (flag) {
    case '--EOL':
      console.log(JSON.stringify(os.EOL));
      break;
      
    case '--cpus': {
      const cpus = os.cpus();
      console.log(`Total CPUs: ${cpus.length}`);
      cpus.forEach((cpu, index) => {
        console.log(`CPU ${index}: ${cpu.model} @ ${(cpu.speed / 1000).toFixed(2)} GHz`);
      });
      break;
    }
      
    case '--homedir':
      console.log(os.homedir());
      break;
      
    case '--username':
      console.log(os.userInfo().username);
      break;
      
    case '--architecture':
      console.log(os.arch());
      break;
      
    default:
      console.log('Invalid input');
  }
}