import React from "react"
import { graphql, Link } from "gatsby"
import styled from 'styled-components'
import { Box, Card, Heading } from "rebass"
import { GatsbyImage } from 'gatsby-plugin-image'
import Layout from "../components/layout"
import Seo from "../components/seo"
import { List, ListItem } from "../components/List"

const Grid = styled(Box)`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  display: grid;
  gap: 100px;
  grid-template-columns: repeat(auto-fit, minmax(128px, 1fr));
`

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <Grid width={[1, 1/2, 2/3]} p={2}>
      {
        data.allContentfulBlogPost.edges.map(edge => (
          <Card key={edge.node.id} width={256} p={3}>
            <Link to={edge.node.slug}>
              <GatsbyImage image={edge.node.heroImage.gatsbyImageData} alt="hero image" /> 
            </Link>
            <Heading>{edge.node.title}</Heading>
            <div>{edge.node.body.childMarkdownRemark.excerpt}</div>
          </Card>
        ))
      }
    </Grid>
  </Layout>
)

export default IndexPage

export const query = graphql`
  {
    allContentfulBlogPost {
      edges {
        node {
          id
          title
          slug
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          heroImage {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED, width: 600)
          }
        }
      }
    }
  }
`