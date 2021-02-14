import { BaseEntity, Connection, EntitySchema } from 'typeorm';
const entitiesChanged = (
  prevEntities: EntitySchema[],
  newEntities: EntitySchema[]
): boolean => {
  if (prevEntities.length !== newEntities.length) return true;
  for (let i = 0; i < prevEntities.length; i++) {
    if (prevEntities[i] !== newEntities[i]) return true;
  }
  return false;
};

export const updateConnectionEntities = async (
  connection: Connection,
  entities: EntitySchema[]
) => {
  // Check if the entities passed have changed and if so replace them
  // and re-sync the typeorm connection.
  if (
    !connection ||
    !entitiesChanged(connection.options.entities as EntitySchema[], entities)
  ) {
    return;
  }

  // @ts-ignore
  connection.options.entities = entities;
  // @ts-ignore
  connection.buildMetadatas();
  if (connection.options.synchronize) {
    await connection.synchronize();
  }
};
