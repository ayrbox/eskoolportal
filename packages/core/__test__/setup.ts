export default function (): Promise<void> {
  console.log('Setting up database for testing....');

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Setup complete');
      resolve();
    }, 2000);
  });
}
