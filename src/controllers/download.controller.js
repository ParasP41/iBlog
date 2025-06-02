import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/APIError.js';
import { ApiResponse } from '../utils/APIResponce.js'
import { Post } from '../models/post.model.js';
import PDFDocument from "pdfkit";

const downloadPost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
        throw new ApiError(404, "Post not found")
    };

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="${post.title}.pdf"`);

    doc.pipe(res);
    doc.fontSize(20).text(post.title);
    doc.fontSize(12).text(`Category: ${post.category}`);
    doc.fontSize(14).text(post.excerpt);
    doc.moveDown().text(post.content);


    if (post.image) {
        const response = await fetch(post.image);
        if (!response.ok) throw new ApiError(500, "Failed to fetch image");

        const arrayBuffer = await response.arrayBuffer();
        const imageBuffer = Buffer.from(arrayBuffer);

        doc.image(imageBuffer, { width: 300 });
    }

    doc.end();
})

export { downloadPost }