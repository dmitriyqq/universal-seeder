import {Command, flags} from '@oclif/command'
import {Seeder, MongodbBackend, Schema} from '@dmitriiqq/seeder'

const schema: Schema = {
  types: [
    {
      name: 'image',
      fields: {
        sourceUrl: {type: 'faker', fakerType: 'image', fakerField: 'imageUrl'},
        boxUrl: {type: 'faker', fakerType: 'image', fakerField: 'imageUrl'},
        iconUrl: {type: 'faker', fakerType: 'image', fakerField: 'imageUrl'},
      },
    },
    {
      name: 'avatar',
      fields: {
        sourceUrl: {type: 'faker', fakerType: 'image', fakerField: 'avatar'},
        boxUrl: {type: 'faker', fakerType: 'image', fakerField: 'avatar'},
        iconUrl: {type: 'faker', fakerType: 'image', fakerField: 'avatar'},
      },
    },
    {
      name: 'town',
      fields: {
        name: {type: 'faker', fakerType: 'address', fakerField: 'cityName'},
        region: {type: 'faker', fakerType: 'address', fakerField: 'state'},
      },
    },
    {
      name: 'name',
      fields: {
        firstName: {type: 'faker', fakerType: 'name', fakerField: 'firstName'},
        lastName: {type: 'faker', fakerType: 'name', fakerField: 'lastName'},
        patronym: {type: 'faker', fakerType: 'name', fakerField: 'middleName'},
      },
    },
  ],
  collections: [
    {
      name: 'users', fields: {
        login: {type: 'faker', fakerType: 'internet', fakerField: 'userName'},
        firstName: {type: 'faker', fakerType: 'name', fakerField: 'firstName'},
        lastName: {type: 'faker', fakerType: 'name', fakerField: 'lastName'},
        patronym: {type: 'faker', fakerType: 'name', fakerField: 'middleName'},
        avatar: {type: 'type', typeName: 'avatar'},
      },
    },
    {
      name: 'shops', fields: {
        name: {type: 'faker', fakerType: 'address', fakerField: 'streetName'},
        address: {type: 'faker', fakerType: 'address', fakerField: 'streetAddress'},
        town: {type: 'type', typeName: 'town'},
        image: {type: 'type', typeName: 'image'},
        lat: {type: 'faker', fakerType: 'address', fakerField: 'latitude'},
        lon: {type: 'faker', fakerType: 'address', fakerField: 'longitude'},
      },
    },
  ],
}

class DmitriiqqSeederCli extends Command {
  static description = 'start seeding'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    con: flags.string({char: 'c'}),
    db: flags.string({char: 'D', description: 'Connection to the mongoDB'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {flags} = this.parse(DmitriiqqSeederCli)

    if (!flags.con || !flags.db) {
      throw new Error('Failed to get the settings')
    }

    const mongoDBBackend = new MongodbBackend(flags.con, flags.db)

    const seeder = new Seeder(mongoDBBackend, schema)

    await seeder.generateCollectionDocuments('shops', 1000);
  }
}

export = DmitriiqqSeederCli
