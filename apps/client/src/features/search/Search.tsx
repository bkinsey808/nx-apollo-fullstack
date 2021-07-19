import { gql, QueryLazyOptions, useLazyQuery } from '@apollo/client';
import { useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce';

import { ThemeSelect } from '../theme/ThemeSelect';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import {
  GetSearchResults,
  GetSearchResultsVariables,
} from './__generated__/GetSearchResults';

const SEARCH = gql`
  query GetSearchResults($contains: String!) {
    search(contains: $contains) {
      ... on Book {
        __typename
        title
      }
      ... on Author {
        __typename
        fullName
      }
    }
  }
`;

export const Search = () => {
  const [search, { loading, error, data }] = useLazyQuery<
    GetSearchResults,
    GetSearchResultsVariables
  >(SEARCH);

  const debouncedSearch = useCallback(
    (options?: QueryLazyOptions<GetSearchResultsVariables>) =>
      debounce(search, 100)(options),
    [search]
  );

  useEffect(() => {
    debouncedSearch({ variables: { contains: '' } });
  }, [debouncedSearch]);

  return (
    <>
      <ThemeSelect />
      <SearchForm search={debouncedSearch} />
      {loading && <div>Loading</div>}
      {error && <div>Error {JSON.stringify(error)}</div>}
      {!data?.search ? (
        <div>No results.</div>
      ) : (
        <SearchResults searchResults={data.search} />
      )}
    </>
  );
};
