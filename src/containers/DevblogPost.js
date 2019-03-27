import React, { Component } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { RouteData } from "react-static";
//
import Theme from "utils/Theme";
import ReadTime from "utils/ReadTime";

import Page from "components/Page";
import Head from "components/Head";
import Main from "components/Main";
import Icon from "components/Icon";
import Link from "components/Link";
import Smackdown from "components/Smackdown";
import Comments from "components/Comments";

import { Container, Header } from "components/Layout";
import { H1 } from "components/Html";

const PostH1 = styled(H1)`
  font-size: ${Theme.sizes.h3}rem;
  line-height: ${Theme.sizes.h3 * 1.2}rem;
`;

const PostContainer = styled("article")`
  .back {
    opacity: 0.6;
    display: inline-block;
    margin-bottom: 2rem;
    transition: all 0.1s ease-out;

    :hover {
      opacity: 1;
    }
  }

  .info {
    font-size: 1.1rem;
    margin-bottom: 1rem;
    opacity: 0.7;
  }

  .tags {
    font-size: 0.8rem;
    margin-bottom: 1rem;

    .tag {
      display: inline-block;
      padding: 0.7rem;
      border-radius: 0.5rem;
      background: ${Theme.colors.primary};
      color: white;
      margin: 0 0.3rem 0.3rem 0;
    }
  }
`;

const PostStyles = styled("div")`
  margin: 0 auto;
  padding: 2rem;
  width: 900px;
  max-width: 100%;

  @media screen and (max-width: 1500px) {
    width: 800px;
  }

  @media screen and (max-width: 1000px) {
    width: 650px;
  }

  @media screen and (max-width: 600px) {
    padding: 0 1rem 1rem;
    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export default class DevblogPost extends Component {
  render() {
    return (
      <RouteData>
        {({ post }) => {
          const wordCount = post.fields.body.split(" ").length.hello;
          return (
            <Page>
              <Head
                title={`${post.fields.title} | Nozzle`}
                description={post.fields.shortDescription}
                type="article"
                path={`/devblog/${post.fields.slug}`}
                images={
                  post.fields.featuredImage && [
                    post.fields.featuredImage.fields.file.url
                  ]
                }
                // videos=[]
                date={post.sys.createdAt}
                tags={post.fields.tags}
                author={post.fields.author[0].fields.name}
                // seriesPermalinks={[]}
                wordCount={wordCount}
              />
              <Main>
                <PostContainer
                  itemScope
                  itemType="http://schema.org/BlogPosting"
                >
                  <Header>
                    <Link to="/devblog/" className="back">
                      <Icon i="arrow-left" /> Back to Devblog
                    </Link>
                    <PostH1 itemProp="name headline">
                      {post.fields.title}
                    </PostH1>
                    <div className="info">
                      {post.fields.author.map(author => (
                        <span
                          itemScope
                          itemProp="author"
                          itemType="http://schema.org/Person"
                          key={author.fields.name}
                        >
                          <span itemProp="name">
                            {/* <a itemProp="url" rel="author" /> */}
                            {author.fields.name}
                          </span>
                        </span>
                      ))}{" "}
                      on{" "}
                      <time
                        dateTime={post.sys.updatedAt}
                        itemProp="dateModified"
                      >
                        {format(new Date(post.sys.updatedAt), "MMM DD, YYYY")}
                      </time>{" "}
                      &bull; {ReadTime(wordCount)} min read
                      <time
                        dateTime={post.sys.createdAt}
                        itemProp="datePublished"
                      />
                    </div>
                    <div className="tags">
                      {post.fields.tags.map(tag => (
                        <Link
                          to={`/devblog/tags/${tag}/`}
                          className="tag"
                          key={tag}
                          style={{
                            background: Theme.colors.tags[tag]
                          }}
                        >
                          {tag}
                        </Link>
                      ))}
                    </div>
                  </Header>
                  <Container>
                    <PostStyles itemProp="articleBody">
                      <Smackdown source={post.fields.body} />
                    </PostStyles>
                  </Container>
                </PostContainer>
                <PostStyles>
                  <Comments
                    path={`/devblog/${post.fields.slug}`}
                    title={post.fields.title}
                  />
                </PostStyles>
              </Main>
            </Page>
          );
        }}
      </RouteData>
    );
  }
}
