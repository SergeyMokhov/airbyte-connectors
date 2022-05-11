import {
  AirbyteLogger,
  AirbyteStreamBase,
  StreamKey,
  SyncMode,
} from 'faros-airbyte-cdk';
import {Dictionary} from 'ts-essentials';

import {AzureRepo, AzureRepoConfig} from '../azure-repos';
import {User} from '../models';

export class Users extends AirbyteStreamBase {
  constructor(
    private readonly config: AzureRepoConfig,
    protected readonly logger: AirbyteLogger
  ) {
    super(logger);
  }

  getJsonSchema(): Dictionary<any, string> {
    return require('../../resources/schemas/users.json');
  }
  get primaryKey(): StreamKey {
    return 'principalName';
  }

  async *readRecords(
    syncMode: SyncMode,
    cursorField?: string[],
    streamSlice?: Dictionary<any>
  ): AsyncGenerator<User> {
    const azureRepo = await AzureRepo.instance(this.config);
    yield* azureRepo.getUsers();
  }
}
