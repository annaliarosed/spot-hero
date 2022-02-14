export default {
    get: jest.fn().mockResolvedValue({
        data: {
            id: 1,
            image: "test image",
            distance: "123",
            title: "test title",
            price: 12,
            description: "description",
        },
    }),

    post: jest.fn().mockResolvedValue({
        data: {},
    }),
};
