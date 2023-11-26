DO $$
BEGIN
    -- Check if the table is empty
    IF NOT EXISTS (SELECT 1 FROM widgets) THEN
        -- Insert seed data
        INSERT INTO widgets (name, manufacturer, inventory) VALUES
        ('Widget A', 'Toyoda', FLOOR(RANDOM() * 100 + 1)::INT),
        ('Widget B', 'Niscan', FLOOR(RANDOM() * 100 + 1)::INT),
        ('Widget C', 'Niscan', FLOOR(RANDOM() * 100 + 1)::INT),
        ('Widget D', 'Toyoda', FLOOR(RANDOM() * 100 + 1)::INT),
        ('Widget E', 'Soobaru', FLOOR(RANDOM() * 100 + 1)::INT);
    END IF;
END $$;