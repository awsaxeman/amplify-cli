import {
  addApiWithoutSchema,
  amplifyPush,
  amplifyPushUpdate,
  createNewProjectDir,
  deleteProject,
  deleteProjectDir,
  updateApiSchema,
} from 'amplify-e2e-core';
import { initJSProjectWithProfile } from '../../../migration-helpers';

describe('amplify searchable migration', () => {
  let projRoot: string;
  beforeEach(async () => {
    projRoot = await createNewProjectDir('api-searchable-cli-migration');
  });

  afterEach(async () => {
    await deleteProject(projRoot);
    deleteProjectDir(projRoot);
  });

  it('init project, add searchable and migrate with updated searchable', async () => {
    const projectName = 'searchable';
    const initialSchema = 'migrations_searchable/initial_searchable.graphql';
    const nextSchema = 'migrations_searchable/updated_searchable.graphql';
    // init, add api and push with installed cli
    await initJSProjectWithProfile(projRoot, { name: projectName });
    await addApiWithoutSchema(projRoot);
    await updateApiSchema(projRoot, projectName, initialSchema);
    await amplifyPush(projRoot);
    // update and push with codebase cli
    updateApiSchema(projRoot, projectName, nextSchema);
    await amplifyPushUpdate(projRoot, undefined, true);
  });
});
