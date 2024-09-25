/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTask = /* GraphQL */ `
  mutation CreateTask(
    $input: CreateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    createTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateTask = /* GraphQL */ `
  mutation UpdateTask(
    $input: UpdateTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    updateTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteTask = /* GraphQL */ `
  mutation DeleteTask(
    $input: DeleteTaskInput!
    $condition: ModelTaskConditionInput
  ) {
    deleteTask(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      sender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      sender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      sender
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createFeatureRequest = /* GraphQL */ `
  mutation CreateFeatureRequest(
    $input: CreateFeatureRequestInput!
    $condition: ModelFeatureRequestConditionInput
  ) {
    createFeatureRequest(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateFeatureRequest = /* GraphQL */ `
  mutation UpdateFeatureRequest(
    $input: UpdateFeatureRequestInput!
    $condition: ModelFeatureRequestConditionInput
  ) {
    updateFeatureRequest(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteFeatureRequest = /* GraphQL */ `
  mutation DeleteFeatureRequest(
    $input: DeleteFeatureRequestInput!
    $condition: ModelFeatureRequestConditionInput
  ) {
    deleteFeatureRequest(input: $input, condition: $condition) {
      id
      title
      description
      status
      createdAt
      updatedAt
      __typename
    }
  }
`;
