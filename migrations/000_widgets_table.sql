CREATE IF NOT EXISTS TABLE widgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    manufacturer VARCHAR(255),
    inventory INT
);
