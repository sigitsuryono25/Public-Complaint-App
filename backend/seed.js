const { User, Category, SKPD, Complaint } = require('./src/models');

const seed = async () => {
    try {
        console.log('Clearing existing data...');
        await Complaint.destroy({ where: {}, truncate: { cascade: true } });
        await SKPD.destroy({ where: {}, truncate: { cascade: true } });
        await Category.destroy({ where: {}, truncate: { cascade: true } });
        await User.destroy({ where: {}, truncate: { cascade: true } });

        console.log('Seeding data...');

        // Users
        const admin = await User.create({ name: 'Admin One', email: 'admin@test.com', password: 'admin123', role: 'ADMIN' });
        const citizen = await User.create({ name: 'John Doe', email: 'john@citizen.com', password: 'citizen123', role: 'CITIZEN' });

        // Categories & SKPD
        const catRoads = await Category.create({ name: 'Infrastruktur Jalan' });
        const catWaste = await Category.create({ name: 'Kebersihan Kota' });

        const skpdPU = await SKPD.create({ name: 'Dinas Pekerjaan Umum', category_id: catRoads.id });
        const skpdDLH = await SKPD.create({ name: 'Dinas Lingkungan Hidup', category_id: catWaste.id });

        // Complaints
        await Complaint.create({
            citizen_id: citizen.id,
            category_id: catRoads.id,
            skpd_id: skpdPU.id,
            title: 'Jalan Berlubang di Sudirman',
            description: 'Ada lubang besar di jalur lambat depan Gedung Astra.',
            latitude: -6.17511,
            longitude: 106.82715,
            status: 'VERIFIED'
        });

        await Complaint.create({
            citizen_id: citizen.id,
            category_id: catWaste.id,
            skpd_id: skpdDLH.id,
            title: 'Tumpukan Sampah Liar',
            description: 'Sampah menumpuk di pinggir jalan raya bogor.',
            latitude: -6.21462,
            longitude: 106.84513,
            status: 'SUBMITTED'
        });

        console.log('Seeding complete!');
        process.exit();
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
};

seed();
