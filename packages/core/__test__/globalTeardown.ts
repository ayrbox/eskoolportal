export default function (): Promise<void> {
  console.log('Clearing test database....');

  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Teardown complete');
      resolve();
    }, 2000);
  });
}
