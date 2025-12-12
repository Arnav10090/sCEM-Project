import { useState } from 'react';
import { Plus, Search, Settings2 } from 'lucide-react';
import { Equipment, Parameter } from './types';
import { initialEquipments } from './sampleData';
import EquipmentCard from './EquipmentCard';
import ParameterCard from './ParameterCard';
import AddEquipmentModal from './AddEquipmentModal';
import AddParameterModal from './AddParameterModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

const EquipmentConfiguration = () => {
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCriticality, setFilterCriticality] = useState<string>('All');

  // Modal states
  const [isEquipmentModalOpen, setIsEquipmentModalOpen] = useState(false);
  const [isParameterModalOpen, setIsParameterModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null);
  const [editingParameter, setEditingParameter] = useState<Parameter | null>(null);

  // Delete confirmation states
  const [deleteEquipmentId, setDeleteEquipmentId] = useState<string | null>(null);
  const [deleteParameterId, setDeleteParameterId] = useState<string | null>(null);

  const generateId = () => `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Filter equipments
  const filteredEquipments = equipments.filter((eq) => {
    const matchesSearch = eq.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCriticality = filterCriticality === 'All' || eq.criticalityLevel === filterCriticality;
    return matchesSearch && matchesCriticality;
  });

  // Add new equipment
  const handleAddEquipment = (data: Omit<Equipment, 'id' | 'parameters' | 'lastUpdated' | 'status'>) => {
    const newEquipment: Equipment = {
      ...data,
      id: generateId(),
      status: 'Active',
      lastUpdated: new Date().toISOString(),
      parameters: [],
    };
    setEquipments([...equipments, newEquipment]);
    setSelectedEquipment(newEquipment);
  };

  // Update equipment
  const handleUpdateEquipment = (data: Omit<Equipment, 'id' | 'parameters' | 'lastUpdated' | 'status'>) => {
    if (!editingEquipment) return;
    
    const updated = equipments.map((eq) =>
      eq.id === editingEquipment.id
        ? { ...eq, ...data, lastUpdated: new Date().toISOString() }
        : eq
    );
    setEquipments(updated);
    
    if (selectedEquipment?.id === editingEquipment.id) {
      setSelectedEquipment({ ...selectedEquipment, ...data, lastUpdated: new Date().toISOString() });
    }
    setEditingEquipment(null);
  };

  // Delete equipment
  const handleDeleteEquipment = () => {
    if (!deleteEquipmentId) return;
    
    setEquipments(equipments.filter((eq) => eq.id !== deleteEquipmentId));
    if (selectedEquipment?.id === deleteEquipmentId) {
      setSelectedEquipment(null);
    }
    toast({
      title: 'Equipment Deleted',
      description: 'Equipment and all its parameters have been removed.',
    });
    setDeleteEquipmentId(null);
  };

  // Add parameter
  const handleAddParameter = (data: Omit<Parameter, 'id'>) => {
    if (!selectedEquipment) return;

    const newParameter: Parameter = {
      ...data,
      id: generateId(),
    };

    const updated = equipments.map((eq) =>
      eq.id === selectedEquipment.id
        ? { ...eq, parameters: [...eq.parameters, newParameter], lastUpdated: new Date().toISOString() }
        : eq
    );
    setEquipments(updated);
    setSelectedEquipment({
      ...selectedEquipment,
      parameters: [...selectedEquipment.parameters, newParameter],
      lastUpdated: new Date().toISOString(),
    });
  };

  // Update parameter
  const handleUpdateParameter = (data: Omit<Parameter, 'id'>) => {
    if (!selectedEquipment || !editingParameter) return;

    const updatedParams = selectedEquipment.parameters.map((p) =>
      p.id === editingParameter.id ? { ...p, ...data } : p
    );

    const updated = equipments.map((eq) =>
      eq.id === selectedEquipment.id
        ? { ...eq, parameters: updatedParams, lastUpdated: new Date().toISOString() }
        : eq
    );
    setEquipments(updated);
    setSelectedEquipment({
      ...selectedEquipment,
      parameters: updatedParams,
      lastUpdated: new Date().toISOString(),
    });
    setEditingParameter(null);
  };

  // Delete parameter
  const handleDeleteParameter = () => {
    if (!selectedEquipment || !deleteParameterId) return;

    const updatedParams = selectedEquipment.parameters.filter((p) => p.id !== deleteParameterId);

    const updated = equipments.map((eq) =>
      eq.id === selectedEquipment.id
        ? { ...eq, parameters: updatedParams, lastUpdated: new Date().toISOString() }
        : eq
    );
    setEquipments(updated);
    setSelectedEquipment({
      ...selectedEquipment,
      parameters: updatedParams,
      lastUpdated: new Date().toISOString(),
    });
    toast({
      title: 'Parameter Deleted',
      description: 'Parameter has been removed from the equipment.',
    });
    setDeleteParameterId(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="grid grid-cols-4 gap-4 animate-fade-in h-[calc(100vh-320px)] min-h-[500px]">
      {/* Left Panel - Equipment List */}
      <div className="col-span-1 bg-card border border-border rounded-lg flex flex-col">
        <div className="p-3 border-b border-border">
          <h3 className="text-sm font-medium text-industrial-red mb-3">Equipment List</h3>
          
          {/* Search */}
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search equipment..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
          </div>

          {/* Filter */}
          <Select value={filterCriticality} onValueChange={setFilterCriticality}>
            <SelectTrigger className="h-8 text-sm">
              <SelectValue placeholder="Filter by criticality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Criticality</SelectItem>
              <SelectItem value="Most critical">Most Critical</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Add Button */}
          <Button
            className="w-full mt-3"
            onClick={() => {
              setEditingEquipment(null);
              setIsEquipmentModalOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add New Equipment
          </Button>
        </div>

        {/* Equipment Cards */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {filteredEquipments.map((eq) => (
            <EquipmentCard
              key={eq.id}
              equipment={eq}
              isSelected={selectedEquipment?.id === eq.id}
              onSelect={() => setSelectedEquipment(eq)}
              onEdit={() => {
                setEditingEquipment(eq);
                setIsEquipmentModalOpen(true);
              }}
              onDelete={() => setDeleteEquipmentId(eq.id)}
            />
          ))}
          {filteredEquipments.length === 0 && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No equipment found
            </div>
          )}
        </div>
      </div>

      {/* Right Panel - Equipment Details */}
      <div className="col-span-3 bg-card border border-border rounded-lg flex flex-col">
        {selectedEquipment ? (
          <>
            {/* Equipment Header */}
            <div className="p-4 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold text-foreground">{selectedEquipment.name}</h2>
                    <span
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        selectedEquipment.criticalityLevel === 'Most critical'
                          ? 'bg-destructive text-destructive-foreground'
                          : selectedEquipment.criticalityLevel === 'High'
                          ? 'bg-orange-500 text-white'
                          : selectedEquipment.criticalityLevel === 'Medium'
                          ? 'bg-yellow-500 text-white'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {selectedEquipment.criticalityLevel}
                    </span>
                    <span
                      className={`flex items-center gap-1 text-xs ${
                        selectedEquipment.status === 'Active' ? 'text-primary' : 'text-destructive'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          selectedEquipment.status === 'Active' ? 'bg-primary' : 'bg-destructive'
                        }`}
                      />
                      {selectedEquipment.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{selectedEquipment.type}</p>
                  {selectedEquipment.description && (
                    <p className="text-sm text-muted-foreground">{selectedEquipment.description}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Last Updated: {formatDate(selectedEquipment.lastUpdated)}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingEquipment(selectedEquipment);
                    setIsEquipmentModalOpen(true);
                  }}
                >
                  <Settings2 className="w-4 h-4 mr-1" />
                  Edit Equipment
                </Button>
              </div>
            </div>

            {/* Parameters Section */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-industrial-red">
                  Parameters Configuration ({selectedEquipment.parameters.length})
                </h3>
                <Button
                  size="sm"
                  onClick={() => {
                    setEditingParameter(null);
                    setIsParameterModalOpen(true);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Parameter
                </Button>
              </div>

              <div className="space-y-3">
                {selectedEquipment.parameters.map((param, index) => (
                  <ParameterCard
                    key={param.id}
                    parameter={param}
                    index={index}
                    onEdit={() => {
                      setEditingParameter(param);
                      setIsParameterModalOpen(true);
                    }}
                    onDelete={() => setDeleteParameterId(param.id)}
                  />
                ))}
                {selectedEquipment.parameters.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-lg">
                    <Settings2 className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No parameters configured</p>
                    <p className="text-xs">Click "Add Parameter" to add monitoring parameters</p>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Settings2 className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Select an equipment from the list</p>
              <p className="text-xs">or add a new one to get started</p>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <AddEquipmentModal
        isOpen={isEquipmentModalOpen}
        onClose={() => {
          setIsEquipmentModalOpen(false);
          setEditingEquipment(null);
        }}
        onSave={editingEquipment ? handleUpdateEquipment : handleAddEquipment}
        editingEquipment={editingEquipment}
        existingNames={equipments.map((eq) => eq.name)}
      />

      <AddParameterModal
        isOpen={isParameterModalOpen}
        onClose={() => {
          setIsParameterModalOpen(false);
          setEditingParameter(null);
        }}
        onSave={editingParameter ? handleUpdateParameter : handleAddParameter}
        editingParameter={editingParameter}
      />

      {/* Delete Equipment Confirmation */}
      <AlertDialog open={!!deleteEquipmentId} onOpenChange={() => setDeleteEquipmentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Equipment?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this equipment and all its associated parameters. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteEquipment}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Parameter Confirmation */}
      <AlertDialog open={!!deleteParameterId} onOpenChange={() => setDeleteParameterId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Parameter?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this parameter? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleDeleteParameter}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default EquipmentConfiguration;
