import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    if (req.method === 'DELETE') {
        try {
            const { currentUser } = await serverAuth(req, res);
            const { postId } = req.query;

            const existingPost = await prisma.post.findUnique({
                where: {
                    id: postId as string,
                },
            });

            if (!existingPost || existingPost.userId !== currentUser.id) {
                return res.status(403).json({ message: "Unauthorized" });
            }

            await prisma.post.delete({
                where: {
                    id: postId as string,
                }
            });

            return res.status(200).json({ message: "Post deleted successfully" });

        } catch (error) {
            console.log(error);
            return res.status(400).end();
        }
    }

    if (req.method === 'PATCH') {
        try {
            const { currentUser } = await serverAuth(req, res);//Authenticate user

            const { postId } = req.query; // get postId from URL

            const { body, image } = req.body // get updated post data


            // find the post to update
            const existingPost = await prisma.post.findUnique({
                where: {
                    id: postId as string
                }
            });

            // check if the post exits and belongs to the current user
            if (!existingPost || existingPost.userId !== currentUser.id) {
                return res.status(403).json({ message: 'Unauthorized' });
            }

            //update the post
            const updatedPost = await prisma.post.update({
                where: {
                    id: postId as string
                },
                data: {
                    body,
                    image
                }
            });

            return res.status(200).json(updatedPost);

        } catch (error) {
            console.log(error);
            return res.status(400).end();
        }
    }

    if (req.method !== 'GET') {
        return res.status(405).end();
    }
    try {
        const { postId } = req.query;
        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid ID');
        }

        const post = await prisma.post.findUnique({
            where: {
                id: postId
            },
            include: {
                user: true,
                comments: {
                    include: {
                        user: true
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            }
        });

        return res.status(200).json(post);

    } catch (error) {
        console.log(error);
        return res.status(400).end();
    }
}