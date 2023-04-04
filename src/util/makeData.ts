import { faker } from '@faker-js/faker'

export type Person = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: 'relationship' | 'complicated' | 'single'
  dob:Date
  subRows?: Person[]
}


const newPerson = (): Person => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    age: faker.datatype.number(40),
    visits: faker.datatype.number(1000),
    progress: faker.datatype.number(100),
    dob:faker.date.birthdate(),
    status: faker.helpers.shuffle<Person['status']>([
      'relationship',
      'complicated',
      'single',
    ])[0]!,
  }
}

export function makeData(len:number) {
 const persons:Person[] = [];
for (let index = 0; index < len; index++) {
    persons.push(newPerson());
    
}
return persons;
}
