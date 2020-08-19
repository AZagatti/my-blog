import React from 'react';
import { Link, graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';
import styled from 'styled-components';

import Bio from '../components/bio';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { rhythm, scale } from '../utils/typography';

interface Props {
  data: {
    site: {
      siteMetadata: {
        title: string;
      };
    };
    mdx: {
      body: string;
      frontmatter: {
        title: string;
        description: string;
        date: string;
        tags: string[];
        keywords: string[];
      };
      fields: {
        slug: string;
        readingTime: {
          minutes: number;
        };
      };
    };
  };
  location: {
    pathname: string;
  };
  pageContext: {
    previous: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
    next: {
      fields: {
        slug: string;
      };
      frontmatter: {
        title: string;
      };
    };
  };
}

const Section = styled.section`
  code {
    font-size: 19px;
    background-color: #f4f4f4;
  }
`;

const Post: React.FC<Props> = ({ data, pageContext, location }) => {
  const post = data.mdx;
  const siteTitle = data.site.siteMetadata.title;
  const { previous, next } = pageContext;
  const disqusConfig = {
    url: `https://blog.azagatti.dev${location.pathname}`,
    identifier: data.mdx.frontmatter.title,
    title: data.site.siteMetadata.title,
  };

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
            {Math.ceil(post.fields.readingTime.minutes)}
          </p>
          <CommentCount config={disqusConfig} placeholder="..." />
        </header>
        <Section>
          <MDXRenderer>{data.mdx.body}</MDXRenderer>
        </Section>
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>

        <Disqus config={disqusConfig} />
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  );
};

export default Post;

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(fields: { slug: { eq: $slug } }) {
      body
      frontmatter {
        title
        date(formatString: "MMMM Do, YYYY")
        tags
        description
        keywords
      }
      fields {
        slug
        readingTime {
          minutes
        }
      }
    }
  }
`;
