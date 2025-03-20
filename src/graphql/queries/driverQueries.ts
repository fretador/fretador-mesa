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
			email
			address {
				cep
				street
				number
				neighborhood
				cityState
			}
			userPhoto {
				imageUrl
				status
				message
				sender
			}
			cnhPhoto {
				imageUrl
				status
				message
				sender
			}
			rgPhoto {
				imageUrl
				status
				message
				sender
			}
			proofResidencePhoto {
				imageUrl
				status
				message
				sender
			}
			vehicleOwner {
				document {
					... on CPF {
						cpf
					}
					... on CNPJ {
						cnpj
					}
				}
				address
				contact
				email
			}
			vehicle {
				type
				plate
				renavam
				ownerName
				ownerDocument
				anttPhoto {
					imageUrl
					status
					message
					sender
				}
				documentPhoto {
					imageUrl
					status
					message
					sender
				}
				vehiclePhoto {
					imageUrl
					status
					message
					sender
				}
				semiTrailerDocumentPhotos {
					imageUrl
					status
					message
					sender
				}
				semiTrailerPhotos {
					imageUrl
					status
					message
					sender
				}
			}
			wallet {
				bank
				account
				agency
				pix
				accountType
			}
			statusHistory {
				status
				date
				reason
			}
		}
	}
`;
