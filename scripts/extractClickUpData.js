// Script para extrair dados do ClickUp via API
// Execute com: node scripts/extractClickUpData.js

const API_TOKEN = 'pk_55083349_49KLFJ2OZUNAMPKG0T519PDYX1AZY3YW';
const TEAM_ID = '3089165'; // Do URL do ClickUp

// Primeiro vamos descobrir as pastas e listas disponíveis

async function getSpaces() {
    const response = await fetch(`https://api.clickup.com/api/v2/team/${TEAM_ID}/space?archived=false`, {
        headers: { 'Authorization': API_TOKEN }
    });
    const data = await response.json();
    console.log('=== SPACES ===');
    console.log(JSON.stringify(data, null, 2));
    return data.spaces || [];
}

async function getFolders(spaceId) {
    const response = await fetch(`https://api.clickup.com/api/v2/space/${spaceId}/folder?archived=false`, {
        headers: { 'Authorization': API_TOKEN }
    });
    const data = await response.json();
    console.log(`\n=== FOLDERS in space ${spaceId} ===`);
    console.log(JSON.stringify(data, null, 2));
    return data.folders || [];
}

async function getLists(folderId) {
    const response = await fetch(`https://api.clickup.com/api/v2/folder/${folderId}/list?archived=false`, {
        headers: { 'Authorization': API_TOKEN }
    });
    const data = await response.json();
    console.log(`\n=== LISTS in folder ${folderId} ===`);
    console.log(JSON.stringify(data, null, 2));
    return data.lists || [];
}

async function getTasks(listId, statuses = []) {
    const params = new URLSearchParams();
    params.append('include_closed', 'true');
    params.append('subtasks', 'true');
    statuses.forEach(s => params.append('statuses[]', s));

    const url = `https://api.clickup.com/api/v2/list/${listId}/task?${params.toString()}`;
    console.log(`\nFetching tasks from: ${url}`);

    const response = await fetch(url, {
        headers: { 'Authorization': API_TOKEN }
    });

    if (!response.ok) {
        console.error('Error:', response.status, await response.text());
        return [];
    }

    const data = await response.json();
    return data.tasks || [];
}

async function main() {
    console.log('=== CLICKUP DATA EXTRACTION ===\n');

    // Tentar buscar diretamente da lista conhecida
    // O view ID 2y8rd-68013 corresponde a qual list?
    // Vamos tentar buscar os espaços primeiro

    try {
        const spaces = await getSpaces();

        for (const space of spaces) {
            console.log(`\n--- Space: ${space.name} (ID: ${space.id}) ---`);

            const folders = await getFolders(space.id);

            for (const folder of folders) {
                console.log(`\n  Folder: ${folder.name} (ID: ${folder.id})`);

                // Check if this is the BACKEND folder
                if (folder.name.toLowerCase().includes('backend')) {
                    console.log(`  ** FOUND BACKEND FOLDER! **`);

                    const lists = await getLists(folder.id);

                    for (const list of lists) {
                        console.log(`    List: ${list.name} (ID: ${list.id})`);

                        // Check if this is the BACKEND | Ciclo list
                        if (list.name.toLowerCase().includes('ciclo') || list.name.toLowerCase().includes('backend')) {
                            console.log(`    ** FOUND TARGET LIST! **`);
                            console.log(`    List ID: ${list.id}`);

                            // Fetch tasks with aprovado and concluido status
                            console.log('\n    Fetching tasks with status "aprovado" and "concluido"...');
                            const tasks = await getTasks(list.id, ['aprovado', 'concluido']);

                            console.log(`\n    Total tasks found: ${tasks.length}`);

                            if (tasks.length > 0) {
                                // Show first task structure
                                console.log('\n    === FIRST TASK STRUCTURE ===');
                                console.log(JSON.stringify(tasks[0], null, 2));

                                // Show all custom fields
                                console.log('\n    === CUSTOM FIELDS ===');
                                const customFields = new Map();
                                tasks.forEach(task => {
                                    if (task.custom_fields) {
                                        task.custom_fields.forEach(cf => {
                                            customFields.set(cf.name, cf.type);
                                        });
                                    }
                                });
                                customFields.forEach((type, name) => {
                                    console.log(`    - ${name}: ${type}`);
                                });
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
