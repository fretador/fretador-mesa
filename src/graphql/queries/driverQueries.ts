import { gql } from "@apollo/client";

export const GET_DRIVERS_QUERY = gql`
  query GetDrivers($page: Int, $limit: Int, $filter: DriverFilterInput) {
    drivers(page: $page, limit: $limit, filter: $filter) {
      edges {
        node {
          id
          name
          cpf
          status
          phoneNumber
          vehicle {
            type
          }
          userPhoto {
            imageUrl
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        currentPage
        totalPages
      }
    }
  }
`;

export const GET_DRIVER_BY_ID = gql`
  query GetDriverById($id: ID!) {
    driver(id: $id) {
      id
      name
      cpf
      status
      phoneNumber
      vehicle {
        type
      }
      userPhoto {
        imageUrl
      }
      cnhPhoto {
        imageUrl
      }
      rgPhoto {
        imageUrl
      }
      proofResidencePhoto {
        imageUrl
      }
      vehicleOwner {
        contact
        email
      }
      vehicle {
        anttPhoto {
          imageUrl
        }
        documentPhoto {
          imageUrl
        }
        semiTrailerDocumentPhotos {
          imageUrl
        }
        semiTrailerPhotos {
          imageUrl
        }

        vehiclePhoto {
          imageUrl
        }
      }
    }
  }
`;
