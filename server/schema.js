// Schemas for various tables

const Joi = require("joi");

module.exports.studentSchema = Joi.object({
    name: Joi.string().required(),
    grade: Joi.string().required(),
    institute: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    password: Joi.string().required(),
    verify: Joi.bool().default(false),
    token: Joi.string(),
    expireAt: Joi.date(),
});

module.exports.verifySchema = Joi.object({
    token: Joi.string().required,
    expireAt: Joi.date().required,
    studentId: Joi.string().required
});

module.exports.instituteSchema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().email().required(),
    query: Joi.string().required(),
});

module.exports.playListSchema = Joi.object({
    title: Joi.string().required(),
});

module.exports.videosSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    youtubeVidoeId: Joi.string().required(),
    playListId: Joi.string().required(),
});

module.exports.blogSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    coverPicture: Joi.string().required(),
    date: Joi.string().required(),
});

module.exports.commentSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string(),
    comment: Joi.string().required(),
    date: Joi.string().required(),
    blogId: Joi.string().required(),
});

module.exports.testimonialSchema = Joi.object({
    name: Joi.string().required(),
    testimonial: Joi.string().required(),
    profession: Joi.string().required(),
    rating: Joi.number().min(1).max(5).required(),
    youtubeVideoId: Joi.string().required(),
});

module.exports.faqSchema = Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
});

module.exports.adminLoginSchema = Joi.object({
    key: Joi.string().required(),
    password: Joi.string().required(),
});

module.exports.mentorSchema = Joi.object({
    name: Joi.string().required(),
    designation: Joi.string().required(),
    about: Joi.string().required(),
    profile: Joi.string().required(),
    instagram: Joi.string().required(),
    facebook: Joi.string().required(),
    linkedIn: Joi.string().required(),
});

module.exports.squadSchema = Joi.object({
    name: Joi.string().required(),
    designation: Joi.string().required(),
    profile: Joi.string().required(),
    instagram: Joi.string().required(),
    facebook: Joi.string().required(),
    linkedIn: Joi.string().required(),
});

// module.exports.userSchema = Joi.object({

// });