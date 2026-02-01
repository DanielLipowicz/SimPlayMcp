import { User } from '../dataObjects/User';

const standardUserPassword = process.env.STANDARD_USER_PASSWORD;
if (!standardUserPassword) {
  throw new Error(
    'STANDARD_USER_PASSWORD is not set. Check your .env file.'
  );
}

export const standardUser = User.builder()
  .withEmail('test@simplicityvibe.com')
  .withPassword(standardUserPassword)
  .withOwnedVehicles([
    { name: 'Toyota Camry' },
    { name: 'Honda Civic' },
    { name: 'Tesla Model 3' },
  ])
  .build();
