// ClickUp API Service
// Configuração para integração com ClickUp API v2

export interface ClickUpTask {
    id: string;
    name: string;
    status: {
        status: string;
        type: string;
        color: string;
    };
    date_created: string;
    date_updated: string;
    date_closed?: string;
    date_done?: string;
    priority?: {
        id: string;
        priority: string;
        color: string;
    };
    assignees: Array<{
        id: number;
        username: string;
        color: string;
        profilePicture?: string;
    }>;
    tags: Array<{
        name: string;
        tag_fg: string;
        tag_bg: string;
    }>;
    custom_fields?: Array<{
        id: string;
        name: string;
        value?: string | number | boolean;
    }>;
}

export interface ClickUpResponse {
    tasks: ClickUpTask[];
}

export interface ProcessedBackendData {
    tipoTarefa: { name: string; value: number; percentage: number }[];
    responsavel: { name: string; value: number; percentage: number }[];
    prioridade: { name: string; value: number; percentage: number }[];
    modulo: { name: string; value: number; percentage: number }[];
    total: number;
}

// Configuração da API (usar variáveis de ambiente em produção)
const CLICKUP_API_BASE = "https://api.clickup.com/api/v2";

// Função para buscar tarefas de uma lista
export async function fetchClickUpTasks(
    listId: string,
    apiToken: string,
    options?: {
        statuses?: string[];
        dateCreatedGt?: number;
        dateCreatedLt?: number;
        includeClosed?: boolean;
    }
): Promise<ClickUpTask[]> {
    const params = new URLSearchParams();

    if (options?.statuses) {
        options.statuses.forEach((status) => {
            params.append("statuses[]", status);
        });
    }

    if (options?.dateCreatedGt) {
        params.set("date_created_gt", options.dateCreatedGt.toString());
    }

    if (options?.dateCreatedLt) {
        params.set("date_created_lt", options.dateCreatedLt.toString());
    }

    if (options?.includeClosed) {
        params.set("include_closed", "true");
    }

    const response = await fetch(
        `${CLICKUP_API_BASE}/list/${listId}/task?${params.toString()}`,
        {
            headers: {
                Authorization: apiToken,
                "Content-Type": "application/json",
            },
        }
    );

    if (!response.ok) {
        throw new Error(`ClickUp API error: ${response.status}`);
    }

    const data: ClickUpResponse = await response.json();
    return data.tasks;
}

// Função para processar tarefas em dados do dashboard
export function processTasksForDashboard(tasks: ClickUpTask[]): ProcessedBackendData {
    const total = tasks.length;

    // Agrupar por tipo/tag
    const tipoMap = new Map<string, number>();
    const responsavelMap = new Map<string, number>();
    const prioridadeMap = new Map<string, number>();
    const moduloMap = new Map<string, number>();

    tasks.forEach((task) => {
        // Tipo baseado na primeira tag ou "Outros"
        const tipo = task.tags[0]?.name || "Outros";
        tipoMap.set(tipo, (tipoMap.get(tipo) || 0) + 1);

        // Responsável
        const assignee = task.assignees[0]?.username || "Não atribuído";
        responsavelMap.set(assignee, (responsavelMap.get(assignee) || 0) + 1);

        // Prioridade
        const priority = task.priority?.priority || "Normal";
        prioridadeMap.set(priority, (prioridadeMap.get(priority) || 0) + 1);

        // Módulo baseado em tags secundárias
        const modulo = task.tags[1]?.name || task.tags[0]?.name || "Geral";
        moduloMap.set(modulo, (moduloMap.get(modulo) || 0) + 1);
    });

    const mapToArray = (map: Map<string, number>) => {
        return Array.from(map.entries())
            .map(([name, value]) => ({
                name,
                value,
                percentage: Number(((value / total) * 100).toFixed(2)),
            }))
            .sort((a, b) => b.value - a.value);
    };

    return {
        tipoTarefa: mapToArray(tipoMap),
        responsavel: mapToArray(responsavelMap),
        prioridade: mapToArray(prioridadeMap),
        modulo: mapToArray(moduloMap),
        total,
    };
}

// Datas para outubro e novembro de 2025 (Unix timestamps em milissegundos)
export const OCTOBER_2025_START = new Date("2025-10-01T00:00:00Z").getTime();
export const OCTOBER_2025_END = new Date("2025-10-31T23:59:59Z").getTime();
export const NOVEMBER_2025_START = new Date("2025-11-01T00:00:00Z").getTime();
export const NOVEMBER_2025_END = new Date("2025-11-30T23:59:59Z").getTime();
