import { Contact } from '../database';

const resolvers = {
    Query: {
        contacts: () => Contact.findAll(),
        contact: (_: unknown, { id }: { id: number }) => Contact.findByPk(id),
        
    },

    Mutation: {
        addContact: (_: unknown, { name, email, phone }: { name: string; email: string; phone: string }) =>
            Contact.create({ name, email, phone }),
        updateContact: async (
            _: unknown,
            { id, name, email, phone }: { id: number; name?: string; email?: string; phone?: string }
        ) => {
            const contact = await Contact.findByPk(id);
            if (!contact) throw new Error('Contact not found');
            await contact.update({ name, email, phone });
            return contact;
        },
        deleteContact: async (_: unknown, { id }: { id: number }) => {
            const deleted = await Contact.destroy({ where: { id } });
            return !!deleted;
        },
    },
};

export default resolvers;