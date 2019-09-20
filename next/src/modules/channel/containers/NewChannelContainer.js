import React from 'react'
import { func, array } from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

const mutation = gql`
  mutation CreateChannel ($name: String!) {
    createTaxonomyTermChannel (input: { name: $name }) {
      violations {
        message
        path
        code
      }
      errors
      entity {
        entityId
      }
    }
  }
`

// @TODO: implement optimistic query on channels?

const NewChannelContainer = ({ children, channels }) => (
  <Mutation mutation={ mutation } refetchQueries={ ['Channels'] }>
    { mutate => (
      children(name => {
        if (name) {
          const result = channels.find(i => i.name === name);
          result ? alert('A channel with the same already exists') :  mutate({ variables: { name }})
        }
      })
    ) }
  </Mutation>
);

NewChannelContainer.propTypes = {
  children: func,
  channels: array
};

export default NewChannelContainer
