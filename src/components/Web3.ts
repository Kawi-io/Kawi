import fs from 'fs';

export default function Web3() {
  const data = {
    name: 'John Doe',
    age: 30,
    email: 'johndoe@example.com',
  };

  const jsonString = JSON.stringify(data);
  const filePath = './metadata/metadata.json';

  fs.writeFileSync(filePath, jsonString);

  return 0;
}
