import React from 'react';
import BlogCard from '../components/blog_card';
import Layout from '../components/indexLayout';
import { graphql } from 'gatsby';
import MainLogo from '../images/logo_main.png';
import GatsbyConfig from '../../gatsby-config'
import CustomHelmet from '../components/CustomHelmet';

function getBlogs(data) {
	let blogs = [];
	let blogList = data.allMarkdownRemark.edges;

	blogList.map(element => {
		blogs.push(<BlogCard data={element.node.frontmatter} />)
	});
	return blogs;
}

const BlogsPage = ({ data }) => (
	<Layout>
		<CustomHelmet page={GatsbyConfig.siteMetadata.blog} image={MainLogo} />
		<div className="page">
			<div className="container">
				<section className="blog-section">
					<div className="blog-posts">

						{getBlogs(data)}

					</div>
					<div className="blog-newsletter">
						<div className="news-card">
							<img alt="" src=""></img>
						</div>
					</div>
				</section>
			</div>
		</div>
	</Layout>
)

export default BlogsPage

export const blogsQuery = graphql`
query blogsQuery {
	allMarkdownRemark(
		sort: {
			fields: [frontmatter___date],
			order: DESC
		},
		filter: {
			fileAbsolutePath: {
				regex: "/blogs/.*md$/"
			}
		}
	) {
		totalCount
		edges {
			node {
				id
				frontmatter {
					slug
					cover {
						publicURL
						childImageSharp {
							sizes(maxWidth: 700) {
								srcSet
							}
						}
					}
					tags
					title
					description
					author
					date(formatString: "DD-MMM-YYYY")
				}
			}
		}
	}
}
`;