module.exports = {
    'import/no-restricted-paths': [
        'error',
        {
            zones: [
                // disables cross-feature imports:
                // eg. src/features/discussions should not import from src/features/comments, etc.
                {
                    target: './src/features/auth',
                    from: './src/features',
                    except: ['./auth'],
                },
                {
                    target: './src/features/comments',
                    from: './src/features',
                    except: ['./comments'],
                },
                {
                    target: './src/features/discussions',
                    from: './src/features',
                    except: ['./discussions'],
                },
                {
                    target: './src/features/teams',
                    from: './src/features',
                    except: ['./teams'],
                },
                {
                    target: './src/features/users',
                    from: './src/features',
                    except: ['./users'],
                },

                // enforce unidirectional codebase:
                // e.g. src/app can import from src/features but not the other way around
                {
                    target: './src/features',
                    from: './src/app',
                },

                // e.g src/features and src/app can import from these shared modules but not the other way around
                {
                    target: [
                        './src/components',
                        './src/hooks',
                        './src/lib',
                        './src/types',
                        './src/utils',
                    ],
                    from: ['./src/features', './src/app'],
                },

                // More restrictions...
            ],
        },
    ],
};