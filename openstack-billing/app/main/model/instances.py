from app.main import db

class Instance(db.Model):
    __bind_key__ = 'nova'
    __tablename__ = 'instances'
    __table_args__ = (
        db.Index('instances_task_state_updated_at_idx', 'task_state', 'updated_at'),
        db.Index('instances_terminated_at_launched_at_idx', 'terminated_at', 'launched_at'),
        db.Index('instances_host_deleted_cleaned_idx', 'host', 'deleted', 'cleaned'),
        db.Index('instances_project_id_deleted_idx', 'project_id', 'deleted'),
        db.Index('instances_updated_at_project_id_idx', 'updated_at', 'project_id'),
        db.Index('instances_uuid_deleted_idx', 'uuid', 'deleted'),
        db.Index('instances_deleted_created_at_idx', 'deleted', 'created_at'),
        db.Index('instances_host_node_deleted_idx', 'host', 'node', 'deleted')
    )

    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    deleted_at = db.Column(db.DateTime)
    id = db.Column(db.Integer, primary_key=True)
    internal_id = db.Column(db.Integer)
    user_id = db.Column(db.String(255))
    project_id = db.Column(db.String(255), index=True)
    image_ref = db.Column(db.String(255))
    kernel_id = db.Column(db.String(255))
    ramdisk_id = db.Column(db.String(255))
    launch_index = db.Column(db.Integer)
    key_name = db.Column(db.String(255))
    key_data = db.Column(db.String)
    power_state = db.Column(db.Integer)
    vm_state = db.Column(db.String(255))
    memory_mb = db.Column(db.Integer)
    vcpus = db.Column(db.Integer)
    hostname = db.Column(db.String(255))
    host = db.Column(db.String(255))
    user_data = db.Column(db.String)
    reservation_id = db.Column(db.String(255), index=True)
    launched_at = db.Column(db.DateTime)
    terminated_at = db.Column(db.DateTime)
    display_name = db.Column(db.String(255))
    display_description = db.Column(db.String(255))
    availability_zone = db.Column(db.String(255))
    locked = db.Column(db.Integer)
    os_type = db.Column(db.String(255))
    launched_on = db.Column(db.String)
    instance_type_id = db.Column(db.Integer)
    vm_mode = db.Column(db.String(255))
    uuid = db.Column(db.String(36), nullable=False, unique=True)
    architecture = db.Column(db.String(255))
    root_device_name = db.Column(db.String(255))
    access_ip_v4 = db.Column(db.String(39))
    access_ip_v6 = db.Column(db.String(39))
    config_drive = db.Column(db.String(255))
    task_state = db.Column(db.String(255))
    default_ephemeral_device = db.Column(db.String(255))
    default_swap_device = db.Column(db.String(255))
    progress = db.Column(db.Integer)
    auto_disk_config = db.Column(db.Integer)
    shutdown_terminate = db.Column(db.Integer)
    disable_terminate = db.Column(db.Integer)
    root_gb = db.Column(db.Integer)
    ephemeral_gb = db.Column(db.Integer)
    cell_name = db.Column(db.String(255))
    node = db.Column(db.String(255))
    deleted = db.Column(db.Integer)
    # locked_by = db.Column(db.ENUM('owner', 'admin'))
    cleaned = db.Column(db.Integer)
    ephemeral_key_uuid = db.Column(db.String(36))
