import { User } from '../dataObjects/User';

export const standardUser = User.builder()
  .withEmail('test@simplicityvibe.com')
  .withPassword('password')
  .withOwnedVehicles([
    { name: 'Toyota Camry' },
    { name: 'Honda Civic' },
    { name: 'Tesla Model 3' },
  ])
  .build();
